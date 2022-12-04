package repository

import (
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func Init(userName string, userPwd string, dbAddr string, dbName string) error {
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8&parseTime=True",
		userName,
		userPwd,
		dbAddr,
		dbName)
	var err error
	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if db.Migrator().HasTable(&Chirography{}) == false {
		db.Migrator().CreateTable(&Chirography{})
	}
	if err != nil {
		panic("连接数据库失败, error=" + err.Error())
	}
	return nil
}
