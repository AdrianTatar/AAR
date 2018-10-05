import { ZkRoutingModule } from './zk-routing.module';

describe('ZkRoutingModule', () => {
  let zkRoutingModule: ZkRoutingModule;

  beforeEach(() => {
    zkRoutingModule = new ZkRoutingModule();
  });

  it('should create an instance', () => {
    expect(zkRoutingModule).toBeTruthy();
  });
});
