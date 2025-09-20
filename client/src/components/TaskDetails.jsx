import React from 'react'

const TaskDetails = ({ selectedTask, setShowDetails, loadTaskData }) => {

    console.log(selectedTask);


    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>Task Details</h3>
                    <button className="modal-close" onClick={() => setShowDetails(false)}>×</button>
                </div>
            
            <div className="modal-body">
                {selectedTask && (
                       <div class='task-details'>
                    <div class="detail-section">
                        <h3><i class="fas fa-heading"></i> Title & Status</h3>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <strong>Title</strong>
                                <span>{selectedTask.title}</span>
                            </div>
                            <div class="detail-item">
                                <strong>Priority</strong>
                                <span class="priority-medium">{selectedTask.priority}</span>
                            </div>
                            <div class="detail-item">
                                <strong>Status</strong>
                                <span class="status-in-progress">{selectedTask.status}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h3><i class="fas fa-align-left"></i> Description</h3>
                        <div class="description-box">
                            {selectedTask.description}
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h3><i class="fas fa-users"></i> People</h3>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <strong>Created By</strong>
                                <div class="user-info">
                                    <div class="user-avatar">I</div>
                                    <span>{selectedTask.createdBy.name}</span>
                                </div>
                            </div>
                            <div class="detail-item">
                                <strong>Assigned To</strong>
                                <div class="user-info">
                                    <div class="user-avatar">R</div>
                                    <span>{selectedTask.assignedTo.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h3><i class="fas fa-calendar-alt"></i> Dates</h3>
                        <div class="dates-container">
                            <div class="date-item">
                                <strong>Created At</strong>
                                <span>{new Date(selectedTask.createdAt).toLocaleDateString('en-IN')}</span>
                            </div>
                            <div class="date-item">
                                <strong>Due Date</strong>
                                <span>{new Date(selectedTask.dueDate).toLocaleDateString('en-IN')}</span>
                            </div>
                            <div class="date-item">
                                <strong>Completed At</strong>
                                <span>{selectedTask.completedAt ?(new Date(selectedTask.completedAt).toLocaleDateString('en-IN')) : selectedTask.status}</span>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
        </div>
    )
}

export default TaskDetails