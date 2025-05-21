import './team.css';
import Team_Photo from '../Team_Photo/team_photo';

export default function Team() {
    return (
        <div class='team-container'>
            <section>
                <h1 class='team-header'> The Minds Behind FoodSaver </h1>
                <div class='minds-behind-container'>
                    <div>
                        <p>
                            We're University of Washington students tackling UN Sustainable Development Goal 2: Zero Hunger through technology. 
                        </p>
                        <p>
                            FoodSaver emerged from our observation of a striking disconnect: restaurants in the U-District discard perfectly good food while many in our community lack reliable access to nutrition.
                        </p>
                        <p>
                            Our project connects these dots through a simple, dignified platform that benefits businesses, supports food-insecure individuals, and reduces environmental waste. 
                        </p>
                        <p>
                            We've combined technical skills with human-centered design to create a solution that treats all users with respect.
                        </p>
                    </div>
                    <div>
                        <img src='../../../public/team-img.png' alt='Woman holding sustainable world' class='photo-add'></img>
                    </div>
                </div>
            </section>

            <section>
                <h1 class='team-header'> Meet The Team </h1>
                <div class='meet-the-team-container'>
                    <Team_Photo src='../../../public/ben.jpg' name='Ben Leland' role='Developer' class='team-member'/>
                    <Team_Photo src='../../../public/temp-team.jpg' name='Jonathan To' role='UX Designer' class='team-member' />
                    <Team_Photo src='../../../public/temp-team.jpg' name='Karl Lee' role='Developer' class='team-member' />
                    <Team_Photo src='../../../public/temp-team.jpg' name='Amanuel Tedla' role='UX Designer' class='team-member' />
                    <Team_Photo src='../../../public/temp-team.jpg' name='Carlos Alexis Carrillo Sandoval' role='Developer' class='team-member' />
                </div>
            </section>
        </div>
    )
}