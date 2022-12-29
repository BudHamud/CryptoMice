import React from 'react';
import PlanetCard from './PlanetCard';

const Planets = () => {

    return (
        <section className='planetsContainer'>
            <PlanetCard
            planet={'Mozzarella'}
            mp={100}
            fuel={21}
            exp={5}
            img={'/planets/planet1.png'}
            percent={85}
            CHez={4.4}
            />

            <PlanetCard
            planet={'Gouda Cheese'}
            mp={200}
            fuel={43}
            exp={5}
            img={'/planets/planet4.png'}
            percent={83}
            CHez={8.8}
            />

            <PlanetCard
            planet={'Blue Cheese'}
            mp={300}
            fuel={66}
            exp={5}
            img={'/planets/planet2.png'}
            percent={81}
            CHez={12.72}
            />

            <PlanetCard
            planet={'Brie Cheese'}
            mp={400}
            fuel={90}
            exp={5}
            img={'/planets/planet3.png'}
            percent={79}
            CHez={17.12}
            />

            <PlanetCard
            planet={'Parmesan Cheese'}
            mp={500}
            fuel={114}
            exp={5}
            img={'/planets/planet5.png'}
            percent={77}
            CHez={21.26}
            />

            <PlanetCard
            planet={"Winnimere Cheese"}
            mp={2000}
            fuel={741}
            exp={5}
            img={'/planets/planet20.png'}
            percent={42}
            CHez={137.28}
            />

            <PlanetCard
            planet={"Beaufort d'Éte"}
            mp={2100}
            fuel={950}
            exp={5}
            img={'/planets/planet21.png'}
            percent={41}
            CHez={183.60}
            />

            <PlanetCard
            planet={'Jersey Blue Cheese'}
            mp={2200}
            fuel={1000}
            exp={5}
            img={'/planets/planet22.png'}
            percent={41}
            CHez={199.92}
            />

            <PlanetCard
            planet={'Rogue River Blue'}
            mp={2300}
            fuel={1050}
            exp={5}
            img={'/planets/planet23.png'}
            percent={41}
            CHez={216.24}
            />

            <PlanetCard
            planet={'Caciocavallo Podolico'}
            mp={2400}
            fuel={1100}
            exp={5}
            img={'/planets/planet24.png'}
            percent={41}
            CHez={236.64}
            />

            <PlanetCard
            planet={'Old Ford Cheese'}
            mp={2500}
            fuel={1400}
            exp={5}
            img={'/planets/planet25.png'}
            percent={41}
            CHez={256.8}
            />

            <PlanetCard
            planet={'Bitto Storico'}
            mp={2600}
            fuel={1500}
            exp={5}
            img={'/planets/planet26.png'}
            percent={39}
            CHez={277.44}
            />

            <PlanetCard
            planet={'Wyke Farm Cheddar'}
            mp={2700}
            fuel={1600}
            exp={5}
            img={'/planets/planet27.png'}
            percent={37}
            CHez={297.84}
            />

            <PlanetCard
            planet={'White Stilton Gold'}
            mp={2800}
            fuel={1750}
            exp={5}
            img={'/planets/planet28.png'}
            percent={35}
            CHez={321.6}
            />

            <PlanetCard
            planet={'Moose Cheese'}
            mp={2900}
            fuel={1900}
            exp={5}
            img={'/planets/planet29.png'}
            percent={33}
            CHez={346.36}
            />

            <PlanetCard
            planet={'Bule Cheese'}
            mp={3000}
            fuel={2100}
            exp={5}
            img={'/planets/planet30.png'}
            percent={31}
            CHez={375.36}
            />
        </section>
    );
}

export default Planets;
