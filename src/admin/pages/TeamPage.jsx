import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildURL, API_ENDPOINTS } from '../../config/api';

const TeamPage = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const fetchTeamMembers = async () => {
        try {
            setLoading(true);
            const response = await fetch(buildURL(API_ENDPOINTS.team));
            const data = await response.json();
            if (data.success) {
                setTeamMembers(data.data.teamMembers);
            }
        } catch (error) {
            console.error('Error fetching team members:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this team member?')) return;

        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(buildURL(API_ENDPOINTS.teamById(id)), {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                fetchTeamMembers();
            }
        } catch (error) {
            alert('Error deleting team member: ' + error.message);
        }
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Team Management</h1>
                    <p style={styles.subtitle}>Manage your team members</p>
                </div>
                <button
                    onClick={() => navigate('/admin/team/new')}
                    style={styles.createBtn}
                >
                    + Add Team Member
                </button>
            </div>

            {/* Team Grid */}
            <div style={styles.content}>
                {loading ? (
                    <p>Loading team members...</p>
                ) : teamMembers.length === 0 ? (
                    <div style={styles.empty}>
                        <p>No team members yet. Add your first team member!</p>
                    </div>
                ) : (
                    <div style={styles.grid}>
                        {teamMembers.map((member) => (
                            <div key={member.id} style={styles.card}>
                                {/* Image */}
                                <div style={styles.imageContainer}>
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} style={styles.image} />
                                    ) : (
                                        <div style={styles.placeholder}>
                                            {member.name.charAt(0)}
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div style={styles.info}>
                                    <h3 style={styles.name}>{member.name}</h3>
                                    <p style={styles.role}>{member.role}</p>
                                    {member.bio && (
                                        <p style={styles.bio}>
                                            {member.bio.length > 100
                                                ? member.bio.substring(0, 100) + '...'
                                                : member.bio}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div style={styles.actions}>
                                    <button
                                        onClick={() => navigate(`/admin/team/edit/${member.id}`)}
                                        style={styles.editBtn}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member.id)}
                                        style={styles.deleteBtn}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        background: '#FAFAFA'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        padding: '20px',
        background: '#FFFFFF',
        borderRadius: '8px'
    },
    title: {
        fontSize: '24px',
        fontWeight: 700,
        color: '#000000',
        marginBottom: '4px'
    },
    subtitle: {
        fontSize: '14px',
        color: '#737373'
    },
    createBtn: {
        padding: '12px 24px',
        background: '#16A34A',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer'
    },
    content: {
        background: '#FFFFFF',
        padding: '24px',
        borderRadius: '8px',
        minHeight: '400px'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#737373'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
    },
    card: {
        padding: '20px',
        border: '1px solid #E5E5E5',
        borderRadius: '8px',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column'
    },
    imageContainer: {
        marginBottom: '16px',
        textAlign: 'center'
    },
    image: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover'
    },
    placeholder: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: '#E5E5E5',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '36px',
        fontWeight: 600,
        color: '#737373'
    },
    info: {
        flex: 1,
        marginBottom: '16px',
        textAlign: 'center'
    },
    name: {
        fontSize: '18px',
        fontWeight: 600,
        color: '#000000',
        marginBottom: '4px'
    },
    role: {
        fontSize: '14px',
        color: '#2563EB',
        fontWeight: 500,
        marginBottom: '8px'
    },
    bio: {
        fontSize: '13px',
        color: '#737373',
        lineHeight: 1.5
    },
    actions: {
        display: 'flex',
        gap: '8px'
    },
    editBtn: {
        flex: 1,
        padding: '8px 16px',
        background: '#2563EB',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        cursor: 'pointer'
    },
    deleteBtn: {
        flex: 1,
        padding: '8px 16px',
        background: '#DC2626',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        cursor: 'pointer'
    }
};

export default TeamPage;
