import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Paper, Typography } from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { CustomerRank } from '@types';
import { memberService } from 'services/memberService';

const useStyles = makeStyles({
    timeline: {
        transform: "rotate(90deg)"
    },
    timelineContentContainer: {
        textAlign: "left"
    },
    timelineContent: {
        display: "inline-block",
        transform: "rotate(270deg)",
        textAlign: "center",
        minWidth: 50
    },
    timelineIcon: {
        transform: "rotate(270deg)"
    }
});
const MyTimeline: React.FC<{ distributorId?: string }> = ({ distributorId }) => {
    // const classes = useStyles()
    let [ranks, setRanks] = useState<CustomerRank>()
    useEffect(() => {
        (async () => {
            if (distributorId) {
                let membershipRanks = await memberService.getMembershipByDistributorId({ DistributorId: distributorId })
                if (membershipRanks) {
                    setRanks(membershipRanks)
                }
                if (membershipRanks.succeeded === false) {

                    document.getElementById('DIS-HEADER')!.style.justifyContent = 'space-between'

                }
            }
        })()
    }, [distributorId])

    return (
        <>
            {
                distributorId && ranks?.data && ranks.succeeded === true &&
                <Timeline>
                    {
                        ranks.data.map((rank, i) => {
                            return (
                                <TimelineItem>
                                    <TimelineOppositeContent
                                        sx={{ m: 'auto 0' }}
                                        variant="body2"
                                    >
                                        {rank.threshold} points
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineConnector />
                                        {
                                            i === 0 ? <img src="/img/icons/bronze-medal.png" alt="" /> :
                                                i === 1 ? <img src="/img/icons/silver-medal.png" alt="" /> :
                                                    i === 2 && <img src="/img/icons/gold-medal.png" alt="" />
                                        }
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent sx={{ py: '21px', px: 2 }}>
                                        {rank.discountRate}%
                                        {/* <Typography>Because you need strength</Typography> */}
                                    </TimelineContent>
                                </TimelineItem>
                            )
                        })
                    }


                </Timeline>
            }
        </>
    )
}

export default MyTimeline
