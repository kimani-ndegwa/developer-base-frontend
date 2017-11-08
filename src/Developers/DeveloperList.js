import React from 'react';
import {Link} from 'react-router-dom';
import {Skills} from '../Skills';


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
                                <Link to={`/developer/${developer._id}`}>{developer.name}</Link>
                            </td>

                            <td>
                                <Link to={`/developer/${developer._id}`}>View Details</Link>

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