import styled from 'styled-components'
import MovieSlideSection from '../Organisms/ContentGrid'
import MainHeader from '../Organisms/MainHeader'
import SubHeader from '../Organisms/SubHeader'
import ModalDetailContent from '../Organisms/ModalDetailContent'
import { useState, useEffect } from 'react'

import MainSection from '../Organisms/MainSection'

const UserPageTemplateWrapper = styled.div`
    width: 100vw;
`

function UserPageTemplate({ gbsPick }) {
    const [modal, setModal] = useState(false)
    const [noScroll, setScroll] = useState(false)
    const [id, setId] = useState(null)

    const showModal = async (id) => {
        setModal(true)
        setScroll(true)
        setId(id)
        document.body.style.overflow = 'none'
    }

    const hideModal = (async) => {
        setModal(false)
        setScroll(false)
    }

    useEffect(() => {
        document.querySelector('html').style.overflowY = noScroll ? 'hidden' : 'auto'
    })

    return (
        <>
            <SubHeader />
            <MainHeader />
            <MainSection />
            <UserPageTemplateWrapper className='fc fleft'>
                <MainSection />
                <div className='fr fcenter'>
                    <MovieSlideSection datas={gbsPick} type='movie'></MovieSlideSection>
                </div>
            </UserPageTemplateWrapper>
            {modal ? <ModalDetailContent id={id} hideModal={hideModal} /> : null}
        </>
    )
}

export default UserPageTemplate
