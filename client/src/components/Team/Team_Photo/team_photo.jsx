import "./team_photo.css";

export default function Team_Photo({ src, name, role }) {
    return (
        <div class='team-photo-container'>
            <img src={src} alt={name + " profile photo"} class='team-photo'></img>
            <p class='bio'>{name}</p>
            <p class='bio'>{role}</p>
        </div>
    );
}