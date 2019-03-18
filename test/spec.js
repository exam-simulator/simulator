const hooks = require('./hooks')

const examItem = '[data-test="Demo Exam"]'
const startExam = '[data-test="Start Exam"]'
const confirmStart = 'div.action.confirm'
const questionItem = '[data-test="Question"]'
const gridItem = '[data-test="Grid Item 1"]'
const timer = '[data-test="Timer"]'

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

  it('displays a dialog before starting exam', async function() {
    await app.client.element(startExam).click()
    await app.client.element(confirmStart).getText().should.eventually.equal('START EXAM')
  })

  it('runs an exam file', async function() {
    await app.client.element(confirmStart).click()
    await app.client.element(questionItem).should.eventually.exist
  })

  it('displays navigation', async function() {
    await app.client.element(gridItem).getText().should.eventually.equal('2')
  })

  it('navigates to correct question', async function() {
    await app.client.element(gridItem).click()
    await app.client.pause(1000)
    await app.client.element(questionItem).getHTML(false).toString().includes('Who is the lead prosecutor in Season One of the Netflix series Making a Murderer?')
  })

  it('displays a working timer', async function() {
    await app.client.element(timer).getText().should.eventually.equal('9:59')
    await app.client.pause(2000)
    await app.client.element(timer).getText().should.eventually.equal('9:57')
  })
})


