import React from 'react';
import { mount, configure } from 'enzyme';
import Adaptor from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adaptor() });
describe('App', () => {
  function sutFactory() {
    return mount(<App />);
  }
  it('renders the app', () => {
    const sut = sutFactory();
    expect(sut.find(App).exists()).toBeTruthy();
    sut.unmount();
  });
});
