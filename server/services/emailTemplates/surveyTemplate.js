const keys = require('../../config/keys')

module.exports = (survey) => {
    return `
        <html>

            <body>
                <div style="text-align: center">
                    <h3>I want your feedback</h3>
                    <p>Please enter the following question: </p>
                    <p>${survey.body}</p>

                    <div>
                        <a href="${keys.rootDomain}/api/surveys/${survey.id}/yes"> Yes </a>
                    </div>

                    <div>
                        <a href="${keys.rootDomain}/api/surveys/${survey.id}/no"> No </a>
                    </div>
                </div>
            </body>
        </html>
    `
}