package repository

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

type Status int16
type Chirography struct {
	BrushId     string  `gorm:"primaryKey"` //笔刷数据id
	Type        string  //笔刷类型
	Data        string  //笔刷数据
	X           float32 //数据的左上角x坐标
	Y           float32 //数据的左上角y坐标
	Width       float32 //笔刷数据的宽
	Height      float32 //笔刷数据的高
	UserId      string  //用户id
	BoardId     string  //白板id
	IsDeleted   bool    `gorm:"default:false"` //内部判断是否已经删除
	CreatedTime time.Time
}

func CreateChirographyTable(f *Chirography) (error, Status) {
	resultCreate := db.Create(f)
	if resultCreate.Error != nil {
		return errors.New("数据库添加失败"), 502
	}
	return nil, 200
}
func DeleteChirographyTable(f *Chirography) (error, Status) {
	result := db.Where("created_time = ?", f.CreatedTime).Delete(f)
	if result.Error != nil {
		return errors.New("数据库删除失败"), 504
	}
	return nil, 200
}
func CreateChirography(f *Chirography) (error, Status) {
	var err error
	var status Status
	if err, status, _ = checkBrushTop(f, "create"); err != nil {
		return err, status
	}
	if err, status := CreateChirographyTable(f); err != nil {
		return err, status
	}
	return CreatedBrushTop(f.BrushId, f.CreatedTime)
}
func UpdateChirography(f *Chirography) (error, Status) {
	var eg BrushTop
	var err error
	var status Status
	if err, status, eg = checkBrushTop(f, "update"); err != nil {
		return err, status
	}
	if err, status := CreateChirographyTable(f); err != nil {
		return err, status
	}
	err, status = UpdateBrushTop(f.CreatedTime, f.IsDeleted, eg)
	return err, status
}
func DeleteChirography(f *Chirography) (error, Status) {
	var eg BrushTop
	var err error
	var status Status
	if err, status, eg = checkBrushTop(f, "delete"); err != nil {
		return err, status
	}
	f.IsDeleted = true
	if err, status := CreateChirographyTable(f); err != nil {
		return err, status
	}
	return UpdateBrushTop(f.CreatedTime, f.IsDeleted, eg)
}
func RecalChirography() (error, Status) {
	var chirographyOne Chirography
	var chirographyTwo Chirography
	var result *gorm.DB
	result = db.Order("created_time desc").Limit(1).Find(&chirographyOne)
	if result.Error != nil {
		return errors.New("数据库查询失败"), 503
	}
	if result.RowsAffected == 0 {
		return errors.New("没有可以撤回的数据"), 405
	}
	if err, status := DeleteChirographyTable(&chirographyOne); err != nil {
		return err, status
	}
	result = db.Order("created_time desc").Where("brush_id = ?", chirographyOne.BrushId).Limit(1).Find(&chirographyTwo)
	if result.Error != nil {
		return errors.New("数据库查询失败"), 503
	}
	if result.RowsAffected == 0 {
		chirographyOne.IsDeleted = true
		if err, status := DeleteBrushTop(chirographyOne.BrushId); err != nil {
			return err, status
		}
		return nil, 200
	}
	_, _, eg := FindBrushTop(chirographyTwo.BrushId)
	if err, status := UpdateBrushTop(chirographyTwo.CreatedTime, chirographyTwo.IsDeleted, eg); err != nil {
		return err, status
	}
	return nil, 200
}
func checkBrushTop(f *Chirography, Type string) (error, Status, BrushTop) {
	var eg BrushTop
	result := db.Where("brush_id = ?", f.BrushId).Find(&eg)
	if result.Error != nil {
		return errors.New("数据库查询失败"), 503, eg
	}
	if (Type == "update" || Type == "delete") && eg.IsDeleted == true {
		return errors.New("brushId=" + f.BrushId + " 的数据已被删除！"), 404, eg
	}
	if (Type == "update" || Type == "delete") && result.RowsAffected == 0 {
		return errors.New("brushId=" + f.BrushId + " 的数据不存在！ "), 403, eg
	}
	if Type == "create" && result.RowsAffected != 0 {
		return errors.New("brushId=" + f.BrushId + " 的数据已存在！ "), 402, eg
	}
	return nil, 200, eg
}
