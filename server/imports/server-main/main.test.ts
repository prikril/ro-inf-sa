// chai uses as asset library
import * as chai from "chai";
import * as spies from "chai-spies";
import StubCollections from "meteor/hwillson:stub-collections";

import { Main } from "./main";

chai.use(spies);

describe("Server Main", () => {
  let mainInstance: Main;

  beforeEach(() => {

    // Create instance of main class
    mainInstance = new Main();
  });

  afterEach(() => {
    // Restore database
    StubCollections.restore();
  });

  it("Should call initFakeData on startup", () => {
    mainInstance.initFakeData = chai.spy();
    mainInstance.start();

    chai.expect(mainInstance.initFakeData).to.have.been.called();
  });

});
