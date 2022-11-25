package repository

import "time"

type Chirography struct {
	UserId   int64
	BoardId  int64
	Type     string
	Hash     string
	Data     string
	CreateAt time.Time
	X        float32
	Y        float32
	Width    float32
	Height   float32
}
