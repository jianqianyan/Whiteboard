package repository

import (
	"time"

	"github.com/cloudwego/kitex-examples/bizdemo/easy_note/pkg/errno"
)

type User struct {
	Phone     string `gorm:"primaryKey"`
	Password  string
	UserId    string
	CreatedAt time.Time
}

func CreateUser(f *User) errno.ErrNo {
	resultCreate := db.Create(f)
	if resultCreate.Error != nil {
		return errno.UserAlreadyExistErr
	}
	return errno.Success
}
func CheckUser(f *User) bool {
	result := db.Where("phone=? and password=?", f.Phone, f.Password).Find(&User{})
	if result.RowsAffected == 0 {
		return false
	}
	return true
}
func FindUserId(phone string) string {
	var eg User
	result := db.Where("phone=? and password=?", phone, "admin").Find(&eg)
	if result.RowsAffected == 0 {
		return ""
	}
	return eg.UserId
}
