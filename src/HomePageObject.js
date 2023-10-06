import React from 'react';

function HomePageObject({ user }) {
    return (
        <div>
            <h2>Welcome to the Home Page</h2>
            <p>Hello, {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default HomePageObject;
