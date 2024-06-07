package controllers

import (
	"backend/inits"
	"backend/models"
	"encoding/hex"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/ethereum/go-ethereum/accounts"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

type SignInRequest struct {
	Address   string `json:"address"`
	Signature string `json:"signature"`
}

func GetMessage(c *gin.Context) {
	address := c.Query("address")
	if address == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Address is required"})
		return
	}

	models.DeleteMessagesForAddress(address)

	newMessage := models.Message{Address: address}
	inits.DB.Create(&newMessage)

	c.JSON(http.StatusOK, gin.H{"text": newMessage.Text})
}

func SignIn(c *gin.Context) {
	var req SignInRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	var message models.Message
	if result := inits.DB.Where("address = ?", req.Address).First(&message); result.RowsAffected == 0 {
		log.Println("No message found for this address")
		c.JSON(http.StatusUnauthorized, gin.H{"error": "No message found for this address"})
		return
	}

	if !VerifySignature(req.Address, message.Text, req.Signature) {
		log.Println("Invalid signature")
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid signature"})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"address": req.Address,
		"exp":     time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	now := time.Now()

	var user models.User
	if result := inits.DB.Where("address = ?", req.Address).First(&user); result.RowsAffected == 0 {
		user = models.User{
			Address:         req.Address,
			Token:           tokenString,
			CurrentSignInAt: &now,
		}
		inits.DB.Create(&user)
	} else {
		user.Token = tokenString
		user.SignInCount += 1
		user.LastSignInAt = user.CurrentSignInAt
		user.CurrentSignInAt = &now
		inits.DB.Save(&user)
	}

	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}

func VerifySignature(address, message, signature string) bool {
	msg := accounts.TextHash([]byte(message))
	sig, err := hex.DecodeString(signature[2:])
	if err != nil {
		log.Println("Failed to decode signature:", err)
		return false
	}

	if sig[64] != 27 && sig[64] != 28 {
		log.Println("Invalid Ethereum signature (V value)")
		return false
	}
	sig[64] -= 27

	pubKey, err := crypto.SigToPub(msg, sig)
	if err != nil {
		log.Println("Failed to recover public key from signature:", err)
		return false
	}

	recoveredAddress := crypto.PubkeyToAddress(*pubKey).Hex()
	log.Println("Recovered address:", recoveredAddress) // Log recovered address for debugging
	return recoveredAddress == address
}
