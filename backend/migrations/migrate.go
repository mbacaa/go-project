package main

import (
	"backend/inits"
	"backend/models"
)

func init() {
	inits.LoadEnv()
	inits.ConnectDB()
}

func main() {
	inits.DB.AutoMigrate(&models.User{}, &models.Message{})
}
