import React, {useRef, useState} from 'react'

import {getEmptyBlockHeight} from '@/utils'

import type {IEmptyBlockItem} from '../empty_block'
import EmptyBlock from '../empty_block'

interface IProps {
  isFooter?: boolean
  isDebug?: boolean
  height?: number
  className?: string | undefined
  reportRef?: React.RefObject<HTMLDivElement>
  parentRef?: React.RefObject<HTMLDivElement>
  children?: React.ReactNode
}

const EmptyBlockWrapper: React.FC<IProps> = ({
  isFooter = false,
  isDebug = false,
  height = 0,
  className = '',
  reportRef,
  parentRef,
  children,
}) => {
  const [version, setVersion] = useState<number>(0)
  const wrapperRef = useRef<HTMLDivElement>(null)

  let wrapper_empty_block_info: IEmptyBlockItem = {
    height: 0,
    page: 0,
  }

  if (reportRef) {
    wrapper_empty_block_info = getEmptyBlockHeight(
      reportRef,
      wrapperRef,
      height,
      {isFooter, isDebug},
      parentRef
    )
  }

  // TIP: 这一步很重要，由于判断条件生成的dom, didmount的时候 拿不到dom的高度及位置，强制组件重新生成，来获取计算的数据
  if (
    (!wrapperRef.current?.offsetHeight && !isFooter) ||
    (!wrapperRef.current?.offsetHeight && isFooter)
  ) {
    setTimeout(() => {
      setVersion(version + 1)
    }, 500)
  }

  return (
    <div ref={wrapperRef} className={className}>
      <div style={{display: 'none'}}>{version}xxx</div>
      <EmptyBlock {...wrapper_empty_block_info} isFooter={isFooter} />
      {children}
    </div>
  )
}

export default EmptyBlockWrapper
