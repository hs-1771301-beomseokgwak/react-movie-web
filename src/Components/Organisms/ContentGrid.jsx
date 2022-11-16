import React, { useState } from 'react'
import styled from 'styled-components'
import { findCountry } from '../../Modules/utils'
import ContentCard from '../Molecules/ContentCard'
import ContentSlideSectionTitle from '../Atoms/ContentSlideSectionTitle'
import ContentSlideSectionLink from '../Atoms/ContentSlideSectionLink'
import SkeletonContentSlide from './SkeletonContentSlide'

const ContentSlideSectionDiv = styled.div`
`

const ContentSlideGrid = styled.div`
    position: absolute;
    top: 0rem;
    column-gap: 40rem;
    transition: all 0.5s;
    @media (min-width: 1380px) {
        & {
            width: 1280rem;
        }
    }
`

const SlideWrapper = styled.div`
    height: 1280rem;
    width: 1280rem;
    position: relative;
`

function ContentGrid({ sectionTitle, datas, showModal }) {
    return (
        <ContentSlideSectionDiv>
            <div>
                <ContentSlideSectionTitle text={sectionTitle} />
            </div>
                <SlideWrapper >
                        <ContentSlideGrid id='contentSlideGrid' className='gr'>
                            {datas.map((element, index) => {
                                let rate1 = element.vote_average || ''
                                let rate2 = Math.floor(rate1 * 10)
                                let year1 = element.release_date || ''
                                let year2 = year1?.slice(0, 4)
                                let desc = `${year2}`
                                let country
                                try {
                                    country = element.production_countries[0].iso_3166_1
                                    desc += findCountry(country)
                                } catch (error) {}
                                return (
                                        <ContentCard
                                            key={`grid-content-${element.id}`}
                                            id={element.id}
                                            title={element.title}
                                            desc={desc}
                                            score={element.vote_average * 10}
                                            posterUrl={element.poster_path}
                                            index={index + 1}
                                            type={'movie'}
                                            showModal={showModal}
                                        />
                                )
                            })}
                        </ContentSlideGrid>
                </SlideWrapper>
        </ContentSlideSectionDiv>
        
    )
}

export default ContentGrid
