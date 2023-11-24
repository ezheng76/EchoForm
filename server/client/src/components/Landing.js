import React from 'react'

const Landing = () => {
    return (
        <div>
            <div style={{textAlign: 'center'}}>
                <h1>Welcome! </h1>
                <p>Create, Send, and View surveys to your clients</p>
            </div>

            {/* Instructions */}
            <div>
                <div className='container' style={{marginTop: '100px', height: '100%'}}>
                    <h5>Instructions</h5>
                    <ol>
                        <li>Sign in with Google</li>
                        <li>
                            <p>Add credits to your account</p>
                            <p>
                                This is a free service application so don't use your real credit card.
                                
                                Follow this format:<br/>
                                Card Number: 4242 4242 4242 4242 <br/>
                                Expire Date: Any future date <br/>
                                CSV: Any number            
                            </p>
                        </li>
                    </ol>
                </div>

            </div>
            
        </div>
    )
}

export default Landing