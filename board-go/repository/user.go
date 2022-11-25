package repository

import "time"

type User struct {
	UserId   int64
	UserName string
	Pwd      string
	CreateAt time.Time
}
