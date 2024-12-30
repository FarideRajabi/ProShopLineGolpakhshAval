export interface BranchType {
    id: number,
    title: string
}

export interface UseBranchProps {
    foundBranchCB: (branch: BranchType) => void
    notFoundBranchCB?: () => void

}