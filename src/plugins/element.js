import Vue from 'vue'
import { Button, Container, Header, Main, Row, Col, Dropdown, DropdownMenu, DropdownItem, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Row);
Vue.use(Col);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.prototype.$message = Message;