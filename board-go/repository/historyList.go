package repository

import "time"

type HistoryList struct {
	UserId   int64
	UserName string
	Date     string
	BoardId  int64
	CreateAt time.Time
	Hash     string
}
