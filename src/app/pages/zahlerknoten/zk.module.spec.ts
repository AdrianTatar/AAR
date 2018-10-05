import { ZkModule } from './zk.module';

describe('ZkModule', () => {
  let zkModule: ZkModule;

  beforeEach(() => {
    zkModule = new ZkModule();
  });

  it('should create an instance', () => {
    expect(zkModule).toBeTruthy();
  });
});
