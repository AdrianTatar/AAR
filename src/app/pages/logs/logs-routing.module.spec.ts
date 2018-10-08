import { LogsRoutingModule } from './logs-routing.module';

describe('LogsRoutingModule', () => {
  let logsRoutingModule: LogsRoutingModule;

  beforeEach(() => {
    logsRoutingModule = new LogsRoutingModule();
  });

  it('should create an instance', () => {
    expect(logsRoutingModule).toBeTruthy();
  });
});
