package models

import (
	"fmt"
	"math/rand"
	"time"

	"backend/inits"

	"gorm.io/gorm"
)

type Message struct {
	gorm.Model
	Text      string
	Address   string    `gorm:"not null"`
	Nonce     string
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"`
}

func (message *Message) BeforeCreate(tx *gorm.DB) (err error) {
	message.Nonce = generateNonce(32)
	message.Text = fmt.Sprintf("Sign this message to prove you are owner of this account.\nNonce: %s", message.Nonce)
	return
}

func generateNonce(length int) string {
	const charset = "abcdefghijklmnopqrstuvwxyz" +
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	var seededRand = rand.New(
		rand.NewSource(time.Now().UnixNano()))

	b := make([]byte, length)
	for i := range b {
		b[i] = charset[seededRand.Intn(len(charset))]
	}
	return string(b)
}

func DeleteExpiredMessages() {
	inits.DB.Where("created_at < ?", time.Now().Add(-5*time.Minute)).Delete(&Message{})
}

func DeleteMessagesForAddress(address string) {
	inits.DB.Where("address = ?", address).Delete(&Message{})
}
