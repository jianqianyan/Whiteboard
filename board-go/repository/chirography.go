package repository

import (
	"time"
)

type Chirography struct {
	Type        string  //笔刷类型
	Data        string  //笔刷数据
	X           float32 //数据的左上角x坐标
	Y           float32 //数据的左上角y坐标
	Width       float32 //笔刷数据的宽
	Height      float32 //笔刷数据的高
	UserId      string  //用户id
	BoardId     string  //白板id
	CreatedTime time.Time
}

func (f *Chirography) AddChirography() error {
	db.Create(f)
	return nil
}
