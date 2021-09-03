// var fs = require('fs')
var path = (process.env.WEBPACK_DEV_SERVER_URL) ? 'db/' : 'resources/db/'
var file = path + 'database.db' // 数据库文件的路径
// resources/db/database.db
// var exists = fs.existsSync(file)
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(file)

export function getConfigure (callback) {
  const sql = 'select * from t_conf'
  db.each(sql, function (_err, row) {
    callback(row)
  })
}

export function getInformation (callback) {
  const sql = 'select * from t_info'
  db.each(sql, function (_err, row) {
    callback(row)
  })
}

export function setInformation (json, callback) {
  const sql = db.prepare('update t_info set unit_name = "' + json.unit_name + '", tel = "' + json.tel + '", phone = "' + json.phone + '"')
  sql.run()
  callback(sql)
}

export function getDevices (callback) {
  const sql = 'select * from t_devices'
  db.all(sql, function (_err, row) {
    callback(row)
  })
}

export function getNotices (callback) {
  const sql = 'select * from t_notices'
  db.all(sql, function (_err, row) {
    callback(row)
  })
}

export function setNotices (json, callback) {
  const sql = db.prepare('insert into t_notices (serial_number, project_name, project_address, user_unit, install_date, safety_officer, project_date) values ("' + json.serial_number + '", "' + json.project_name + '", "' + json.project_address + '", "' + json.user_unit + '", "' + json.install_date + '", "' + json.safety_officer + '", "' + json.project_date + '")')
  sql.run()
  callback(sql)
}

export function getNoticeBySN (SerialNumber, callback) {
  const json = {}
  const sql = 'select * from t_info'
  db.each(sql, function (_err, row) {
    // callback(row)
    json.UnitName = row.unit_name
    json.Tel = row.tel
    json.Phone = row.phone
    //
    const device = 'select * from t_devices'
    db.each(device, function (_err, row1) {
      json.DeviceName = row1.device_name
      json.DeviceModel = row1.device_model
      json.DeviceNumber = row1.device_number
      json.RecordNumber = row1.record_number
      json.ProductionUnit = row1.production_unit
      json.PropertyUnit = row1.property_unit
      //
      const notice = 'select * from t_notices where serial_number = "' + SerialNumber + '"'
      db.each(notice, function (_err, row2) {
        json.SerialNumber = row2.serial_number
        json.ProjectName = row2.project_name
        json.ProjectAddress = row2.project_address
        json.UserUnit = row2.user_unit
        json.InstallDate = row2.install_date
        json.SafetyOfficer = row2.safety_officer
        json.ProjectDate = row2.project_date
        //
        callback(json)
      })
    })
  })
}

export default { getConfigure, getInformation, setInformation, getDevices, getNotices, setNotices, getNoticeBySN }
