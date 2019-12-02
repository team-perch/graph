/** Used in jest.config.js */
const { configure } = require ('enzyme');
const Adapter = require ('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });