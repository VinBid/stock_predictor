import React from 'react';

function SignInObject() {
    return (
        <div>
            <h2>Sign In</h2>
            <form method="post">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" />
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />
                <br />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default SignInObject;
