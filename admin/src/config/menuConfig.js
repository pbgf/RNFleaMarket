import {
    HomeOutlined,
    UserOutlined,
    TagOutlined,
    SettingOutlined,
    CommentOutlined,
    PaperClipOutlined
} from '@ant-design/icons';

export default [
    {
        key:'1',
        title: '用户管理',
        icon: <UserOutlined />,
        path: '/app/userManage'
    },
    {
        key:'2',
        title: '帖子管理',
        icon: <CommentOutlined />,
        path: '/app/chatManage'
    },
    {
        key:'3',
        title: '招聘管理',
        icon: <PaperClipOutlined />,
        path: '/app/jobManage'
    },
    {
        key:'4',
        title: '二手转让管理',
        icon: <TagOutlined />,
        path: '/app/SecondHandManage'
    },
]