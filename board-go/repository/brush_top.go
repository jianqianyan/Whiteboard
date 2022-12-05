package repository

import "time"

type BrushTop struct {
	BrushId     string `gorm:"primaryKey"`
	CreatedTime time.Time
	isDeleted   bool `gorm:"default:false"` //内部判断是否已经删除
}

func CreatedBrushTop(brushId string, createdTime time.Time) error {
	result := db.Create(&BrushTop{
		BrushId:     brushId,
		CreatedTime: createdTime,
	})
	return result.Error
}
func UpdateBrushTop(createdTime time.Time, eg BrushTop) error {
	result := db.Model(&eg).Updates(BrushTop{CreatedTime: createdTime})
	return result.Error
}
