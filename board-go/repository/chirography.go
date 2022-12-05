package repository

import (
	"errors"
	"time"
)

type Chirography struct {
	BrushId     string  //笔刷数据id
	Type        string  //笔刷类型
	Data        string  //笔刷数据
	X           float32 //数据的左上角x坐标
	Y           float32 //数据的左上角y坐标
	Width       float32 //笔刷数据的宽
	Height      float32 //笔刷数据的高
	UserId      string  //用户id
	BoardId     string  //白板id
	isDeleted   bool    `gorm:"default:false"` //内部判断是否已经删除
	CreatedTime time.Time
}

func CreateChirography(f *Chirography) error {
	resultCreate := db.Create(f)
	if resultCreate.Error != nil {
		return resultCreate.Error
	}
	var eg BrushTop
	result := db.Where("BrushId = ?", f.BrushId).First(&eg)
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected != 0 {
		return errors.New("BrushId=" + f.BrushId + " 的数据已存在！")
	}
	return CreatedBrushTop(f.BrushId, f.CreatedTime)
}
func UpdateChirography(f *Chirography) error {
	var eg BrushTop
	var err error
	if err, eg = checkBrushTop(f); err != nil {
		return err
	}
	resultCreate := db.Create(f)
	if resultCreate.Error != nil {
		return resultCreate.Error
	}
	return UpdateBrushTop(f.CreatedTime, eg)
}
func checkBrushTop(f *Chirography) (error, BrushTop) {
	var eg BrushTop
	result := db.Where("BrushId = ?", f.BrushId).First(&eg)
	if result.Error != nil {
		return result.Error, eg
	}
	if result.RowsAffected == 0 {
		return errors.New("BrushId=" + f.BrushId + " 的数据不存在！ "), eg
	}
	if eg.isDeleted == true {
		return errors.New("BrushId=" + f.BrushId + " 的数据已被删除！"), eg
	}
	return nil, eg
}
