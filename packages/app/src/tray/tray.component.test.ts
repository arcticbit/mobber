import { MobberTray } from './tray.component';

jest.mock('electron', () => {
  return {
    Tray: (icon: string) => ({
      setTitle: jest.fn(),
      on: jest.fn(),
    }),
  };
});

describe('the tray component', () => {
  it('should compile', () => {
    const tray = new MobberTray({} as any);
    expect(tray).toBeDefined();
  });
});
