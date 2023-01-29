import './App.css';
import Container from './Container';
import Footer from './Footer';
import AddStudentForm from './forms/AddStudentForm'
import {getAllStudents} from './client.js'
import {Component} from 'react';
import {Table, Avatar, Spin, Modal, Empty} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import { errorNotification } from './Notification';

const getLoadingIcon = () => <LoadingOutlined style={{ fontSize: 24 }} spin />;
class App extends Component {

  state = {
    students: [],
    isFetching: false, //spin
    isAddStudentModalVisible: false
  }
  componentDidMount() {
    this.fetchStudents();
  }

  openAddStudentModal = () => this.setState({ isAddStudentModalVisible: true })
  closeAddStudentModal = () => this.setState({ isAddStudentModalVisible: false })

  fetchStudents = () => {
    this.setState({
      isFetching: true
    });
    getAllStudents().then(res => res.json().then(students => {
      console.log(students);
      this.setState({
        students,
        isFetching: false
      });
    }))
    .catch(error=>{
      this.setState({
        isFetching: false
      })
    })
  }
  render() {
    const { students, isFetching, isAddStudentModalVisible } = this.state;

    const commonElements = () => (
        <div>
          <Modal
            title='Add new student'
            visible={isAddStudentModalVisible}
            onOk={this.closeAddStudentModal}
            onCancel={this.closeAddStudentModal}
            width={1000}
          >

            <AddStudentForm 
            onSuccess={()=>{
              this.closeAddStudentModal();
              this.fetchStudents();
            }}
            />
          </Modal>
          <Footer
            numberOfStudents={students.length}
            addStudentClickEvent={this.openAddStudentModal}
          ></Footer>
        </div>
    )

    if (isFetching) {
      return (<Container>
        <Spin indicator={getLoadingIcon()} />
      </Container>);
    }
    if (students && students.length) {
      const columns = [
        {
          title: '',
          key: 'avatar',
          render: (text, student) => (
            <Avatar size='medium'>
              {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
            </Avatar>
          )
        },
        {
          title: 'StudentId',
          dataIndex: 'studentId',
          key: 'studentId'
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName'
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName'
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender'
        }
      ];


      return (
        <Container>
          <Table
          style={{marginBottom: '100px'}}
            dataSource={students}
            columns={columns}
            rowKey='studentId'
            pagination={false} />
            {commonElements()}
        </Container>
      );

    }
    return (
    <Container>
      <Empty description={<h1>No Student Found</h1>}/>
      {commonElements()}
    </Container>
      )
  }
}

export default App;