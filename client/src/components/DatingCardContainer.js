import React, {useEffect, useMemo, useRef, useState} from 'react';
import TinderCard from 'react-tinder-card'
import {Box, ButtonGroup, Container, SvgIcon} from "@mui/material";

import {
    Close, Favorite,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import {useDispatch, useSelector} from "react-redux";
import {getSuggestions, gradeUser, slide} from "../features/match/matchSlice";

const Button = styled('button')`
    background: #FFFFFF;
    border: 0.5px solid rgba(0, 0, 0, 0.04);
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04);
    width: 54px;
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin: 0 7px;
`

const DatingCardContainer = () => {
    const users = useSelector(state => state.match.users);
    const dispatch = useDispatch();

    const [currentIndex, setCurrentIndex] = useState(users.length - 1)
    const [lastDirection, setLastDirection] = useState()
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)

    useEffect(() => {
        dispatch(getSuggestions());
    }, [])


    const childRefs = useMemo(
        () =>
            Array(users.length)
                .fill(0)
                .map((i) => React.createRef()),
        [users.length]
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    useEffect(() => {
        updateCurrentIndex(users.length - 1)
    }, [users.length])

    const canSwipe = currentIndex >= 0

    // set last direction and decrease current index
    const swiped = (direction, idToDelete, index) => {
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
        console.log(direction)
        dispatch(gradeUser({gradeType: direction, userReceived: idToDelete}));
    }

    const outOfFrame = (id, idx) => {
        console.log(`${id} (${idx}) left the screen!`, currentIndexRef.current)
        childRefs[idx].current && currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
        // dispatch(slide(id));
        console.log(users.length)
        if (users.length <= 3) dispatch(getSuggestions());
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid
    }

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < users.length) {
            await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }


    return (
        <Container className="page-container">
            <div className='cardContainer'>
                {users.map((character, index, arr) => (
                    <TinderCard
                        ref={childRefs[index]}
                        className={'swipe' + ' swipe-' + (users.length - index)}
                        key={character.id}
                        preventSwipe={['top', 'bottom']}
                        onSwipe={(dir) => swiped(dir, character.id, index)}
                        onCardLeftScreen={() => outOfFrame(character.id, index)}
                    >
                        <div
                            style={{backgroundImage: 'url(' + character.avatarUrl + ')'}}
                            className='card'
                        >
                            <span className="infoBox">{character.fullName}</span>
                        </div>
                    </TinderCard>
                ))}
            </div>
            {users.length > 0 && <Box justifyContent="space-around" display="flex" sx={{mt: 3}}>
                <ButtonGroup sx={{margin: '0 auto'}} aria-label="outlined primary button group">
                    <Button className="left-thumb" onClick={() => swipe('left')}><Close
                        sx={{fill: "#97979B", height: '30px', width: '30px'}}/></Button>
                    <Button className="right-thumb" onClick={() => swipe('right')}><Favorite
                        sx={{fill: "#FF3F49", height: '30px', width: '30px'}}/></Button>
                </ButtonGroup>
            </Box>}
        </Container>
    );
};

export default DatingCardContainer;