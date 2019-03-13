# Changelog

- All changes to this project will be recorded in this document

## [Unreleased]

### Added

- `electron-updater` to perform automatic updates on `Windows`, (`MacOS` requires code signature)
- `app.requestSingleInstanceLock` to prevent running more than one instance of application
- **LoadingMain** component with title and spinner

### Changed

- **Exam** folder optimized with `shouldComponentUpdate` and `React.memo`

### Fixed

- **AddRemoteExam** component set endpoints to production api
- **Question** component lifecycle pauses question timer when main timer is paused

## 1.0.0-alpha 03-12-19

- Initial Release

[unreleased]: https://github.com/exam-simulator/simulator/compare/v1.0.0-alpha.01...HEAD
