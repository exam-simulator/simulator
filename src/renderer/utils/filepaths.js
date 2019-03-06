import { remote } from 'electron'
import path from 'path'

export const DATA_DIR_PATH = path.join(remote.app.getPath('userData'), '/data')
export const EXAM_DIR_PATH = path.join(DATA_DIR_PATH, '/exams')
export const DEMO_SRC_PATH = path.join(__static, '/exams', 'demo.json')
export const DEMO_DST_PATH = path.join(EXAM_DIR_PATH, 'demo.json')
export const HISTORY_PATH = path.join(DATA_DIR_PATH, 'history.json')
export const SESSIONS_PATH = path.join(DATA_DIR_PATH, 'sessions.json')
export const OPTIONS_SRC_PATH = path.join(__static, 'options.json')
export const OPTIONS_DST_PATH = path.join(DATA_DIR_PATH, 'options.json')
export const BLUE_LOGO_PATH = 'https://s3.amazonaws.com/electron-exam/general/icon.png'
export const RED_LOGO_PATH = 'https://s3.amazonaws.com/electron-exam/general/icon-red.png'
