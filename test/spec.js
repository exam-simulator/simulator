const hooks = require('./hooks')

const examItem = '[data-test="Demo Exam"]'
const startExam = '[data-test="Start Exam"]'
const confirmStart = 'div.action.confirm'

describe('Exam Simulator', function() {
  let app

  before(async function() {
    app = await hooks.startApp()
  })

  after(async function() {
    await hooks.stopApp(app)
  })

  it('opens a window', async function() {
    await app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(1)
      .browserWindow.isMinimized().should.eventually.be.false
      .browserWindow.isVisible().should.eventually.be.true
      .browserWindow.getBounds().should.eventually.have.property('width').and.be.above(0)
      .browserWindow.getBounds().should.eventually.have.property('height').and.be.above(0)
  })

  it('displays a title', async function() {
    await app.browserWindow.getTitle().should.eventually.equal('Exam Simulator')
  })

  it('displays a demo exam item', async function() {
    await app.client.element(examItem)
      .element('.title').getText().should.eventually.equal('Demo Exam')
  })

  it('displays a cover screen', async function() {
    await app.client.element(examItem).click()
    await app.client.element(startExam).getText().should.eventually.equal('Start Exam')
  })

  it('displays a confirm before starting exam', async function() {
    await app.client.element(startExam).click()
    await app.client.element(confirmStart).getText().should.eventually.equal('START EXAM')
  })
})


