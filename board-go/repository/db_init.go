package repository

import (
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Init(userName string, userPwd string, dbUrl string, dbPost string, dbName string) error {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True",
		userName,
		userPwd,
		dbUrl,
		dbPost,
		dbName)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	db.Create(&User{}) //先放着
	if err != nil {
		panic("连接数据库失败, error=" + err.Error())
	}
	return nil
}
