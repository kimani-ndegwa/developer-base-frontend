import React from 'react';


const DeveloperList = ({developers}) => {
    return(
        <table>
            <thead>
            </thead>
            <tr>
                <td>Name</td>
                <td>Skillset</td>
            </tr>
            <tbody>
                {
                    developers.map(developer=>{
                        return(
                            <tr>
                            <td>
                                {developer.name}
                            </td>

                            <td>
                                Skills
                            </td>
                            </tr>

                        )
                    })
                }
            </tbody>
        </table>
    )
}