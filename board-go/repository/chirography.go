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
	var err error
	if err, _ = checkBrushTop(f, "create"); err != nil {
		return err
	}
	resultCreate := db.Create(f)
	if resultCreate.Error != nil {
		return resultCreate.Error
	}
	return CreatedBrushTop(f.BrushId, f.CreatedTime)
}
func UpdateChirography(f *Chirography) error {
	var eg BrushTop
	var err error
	if err, eg = checkBrushTop(f, "update"); err != nil {
		return err
	}
	resultCreate := db.Create(f)
	if resultCreate.Error != nil {
		return resultCreate.Error
	}
	return UpdateBrushTop(f.CreatedTime, eg)
}
func checkBrushTop(f *Chirography, Type string) (error, BrushTop) {
	var eg BrushTop
	result := db.Where("BrushId = ?", f.BrushId).Find(&eg)
	if result.Error != nil {
		return result.Error, eg
	}
	if Type == "update" && eg.isDeleted == true {
		return errors.New("BrushId=" + f.BrushId + " 的数据已被删除！"), eg
	}
	if Type == "update" && result.RowsAffected == 0 {
		return errors.New("BrushId=" + f.BrushId + " 的数据不存在！ "), eg
	}
	if Type == "create" && result.RowsAffected != 0 {
		return errors.New("BrushId=" + f.BrushId + " 的数据已存在！ "), eg
	}
	return nil, eg
}
