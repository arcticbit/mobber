import { MobberApp } from './app';

const trayMock = {
  getBounds: jest.fn().mockReturnValue({
    x: 10,
    y: 10,
    width: 10,
  }),
} as any;

let isVisible: boolean;
const windowMock = {
  show: jest.fn(() => (isVisible = true)),
  hide: jest.fn(() => (isVisible = false)),
  focus: jest.fn(),
  setPosition: jest.fn(),
  isVisible: jest.fn(() => isVisible),
} as any;

describe('the mobber app server', () => {
  let app: MobberApp;

  beforeAll(() => {
    app = new MobberApp();

    app.window = windowMock;
    app.tray = trayMock;
  });

  it('should toggle visibility', () => {
    expect(app.window.isVisible()).toBeFalsy();
    app.toggleInterface();
    expect(app.window.isVisible()).toBeTruthy();
    app.toggleInterface();
    expect(app.window.isVisible()).toBeFalsy();
  });
  it('should focus the window when made visible', () => {
    app.toggleInterface();
    expect(windowMock.focus).toHaveBeenCalled();
  });
  it('should update the position before it becomes visible', () => {
    app.window.hide();
    app.toggleInterface();
    expect(windowMock.setPosition).toHaveBeenCalledWith(5, 10);
  });
});
