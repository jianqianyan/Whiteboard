package repository

import (
	"time"

	"github.com/cloudwego/kitex-examples/bizdemo/easy_note/pkg/errno"
)

type User struct {
	Phone     string `gorm:"primaryKey"`
	Password  string
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
	result := db.Take(f)
	if result.RowsAffected == 0 {
		return false
	}
	return true
}
