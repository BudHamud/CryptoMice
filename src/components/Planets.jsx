import React from 'react';
import PlanetCard from './PlanetCard';

const Planets = () => {
    return (
        <section className='planetsContainer'>
            <PlanetCard
            planet={'Cheese'}
            mp={100}
            fuel={21}
            exp={5}
            img={'/planets/planet1.png'}
            percent={85}
            CHez={4.4}
            base={85}
            rank={0}
            veteran={0}
            />

            <PlanetCard
            planet={'Blue Cheese'}
            mp={200}
            fuel={43}
            exp={5}
            img={'/planets/planet2.png'}
            percent={83}
            CHez={8.8}
            base={83}
            rank={0}
            veteran={0}
            />

            <PlanetCard
            planet={'Brie Cheese'}
            mp={300}
            fuel={66}
            exp={5}
            img={'/planets/planet3.png'}
            percent={81}
            CHez={12.72}
            base={81}
            rank={0}
            veteran={0}
            />

            <PlanetCard
            planet={'Gouda Cheese'}
            mp={400}
            fuel={90}
            exp={5}
            img={'/planets/planet4.png'}
            percent={79}
            CHez={17.12}
            base={79}
            rank={0}
            veteran={0}
            />

            <PlanetCard
            planet={'Parmesan Cheese'}
            mp={500}
            fuel={114}
            exp={5}
            img={'/planets/planet5.png'}
            percent={77}
            CHez={21.26}
            base={77}
            rank={0}
            veteran={0}
            />
        </section>
    );
}

export default Planets;
