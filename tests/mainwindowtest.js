const Application = require("spectron").Application;
const path = require("path");
const assert = require("assert");


var electronPath = path.join(__dirname, "..", "node_modules", ".bin", "electron");

if (process.platform === "win32") {
  electronPath += ".cmd";
}

var appPath = path.join(__dirname, "..");

var app = new Application({
  path: electronPath,
  args: [appPath]
});

describe("Main Window Test", function() {
  this.timeout(10000);

  beforeEach(function() {
    return app.start();
  });

  afterEach(function() {
    return app.stop();
  });

  it("Main Window Check", function() {
    return app.client.getWindowCount().then(function(count) {
      assert.equal(count, 1);
    });
  });

  it("Title Check", function() {
    return app.client.getTitle().then(function(title) {
      assert.equal(title, "Sandman");
    });
  });


  it("Set Sleep Time Check", function() {
    app.client.waitUntilWindowLoaded();
    app.client.execute(function() {
      // browser context - you may not access client or console
      return document.getElementById("alarmTime").value = "07:30";
    });

    return app.client.getValue("#alarmTime").then(function(value) {
      assert.equal(value, "07:30");



    });

  });

});
