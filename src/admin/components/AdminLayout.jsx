import React from 'react';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
    return (
        <div style={styles.container}>
            <Sidebar />
            <div style={styles.content}>
                {children}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        background: '#FAFAFA'
    },
    content: {
        marginLeft: '250px',
        flex: 1,
        padding: '20px',
        width: 'calc(100% - 250px)'
    }
};

export default AdminLayout;
