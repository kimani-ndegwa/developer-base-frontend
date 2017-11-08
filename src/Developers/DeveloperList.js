import React from 'react';


const DeveloperList = ({developers}) => {
    return(
        <table>
            <thead>
            <tr>
                <td>Name</td>
                <td>Skillset</td>
            </tr>
            </thead>
            <tbody>
                {
                    developers.map(developer=>{
                        return(
                            <tr key={developer._id}>
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

export default DeveloperList;