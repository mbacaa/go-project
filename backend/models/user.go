package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username        string    `gorm:"default:''"`
	Address         string    `gorm:"unique;not null"`
	EncryptedPassword string  `gorm:"default:''"`
	SignInCount     int       `gorm:"default:0"`
	CurrentSignInAt *time.Time
	LastSignInAt    *time.Time
	CurrentSignInIP string
	LastSignInIP    string
	Token           string
}
