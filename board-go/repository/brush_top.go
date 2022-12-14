package repository

import (
	"errors"
	"time"
)

type BrushTop struct {
	BrushId     string `gorm:"primaryKey"`
	BoardId     string `gorm:"Index:idx_boardid"`
	CreatedTime time.Time
	IsDeleted   bool `gorm:"default:false"` //判断是否已经删除
}

func CreatedBrushTop(brushId string, boardId string, createdTime time.Time) (error, Status) {
	result := db.Create(&BrushTop{
		BrushId:     brushId,
		BoardId:     boardId,
		CreatedTime: createdTime,
	})
	if result.Error != nil {
		return errors.New("数据库添加失败"), 502
	}
	return nil, 200
}
func UpdateBrushTop(createdTime time.Time, is_deletead bool, eg BrushTop) (error, Status) {
	result := db.Model(&eg).Updates(BrushTop{
		CreatedTime: createdTime,
		IsDeleted:   is_deletead})
	if result.Error != nil {
		return errors.New("数据库更新失败"), 501
	}
	return nil, 200
}
func DeleteBrushTop(brush_id string) (error, Status) {
	result := db.Delete(&BrushTop{BrushId: brush_id})
	if result.Error != nil {
		return errors.New("数据库删除失败"), 504
	}
	return nil, 200
}
func FindBrushTopByBrushId(brush_id string) (error, Status, BrushTop) {
	var eg BrushTop
	result := db.Where("brush_id = ?", brush_id).Find(&eg)
	if result.Error != nil {
		return errors.New("数据库查询失败"), 503, eg
	}
	return nil, 200, eg
}
func FindBrushTopByBoardId(boardId string) (error, Status, []BrushTop) {
	var eg []BrushTop
	result := db.Where("board_id = ?", boardId).Find(&eg)
	if result.Error != nil {
		return errors.New("数据库查询失败"), 503, eg
	}
	return nil, 200, eg
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
