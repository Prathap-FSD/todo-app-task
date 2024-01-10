import { useState } from "react";

function ToDoList() {
    const [headInput, setHeadInput] = useState("");
    const [desInput, setDesInput] = useState("");
    const [card, setCard] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");

    const handleCollect = () => {
        const newTime = new Date();
        const newCard = {
            heading: headInput,
            description: desInput,
            status: false,
            time: newTime,
        };
        setCard((preCard) => [...preCard, newCard]);
        setHeadInput("");
        setDesInput("");
    };

    const handleDelete = (index) => {
        const newCard = [...card];
        newCard.splice(index, 1);
        setCard(newCard);
    };

    const handleEdit = (index) => {
        console.log("Edit ToDo at index:", index);
    };

    const handleStatusChange = (index) => {
        const newCard = [...card];
        newCard[index].status = !newCard[index].status;
        setCard(newCard);
    };

    const filterByStatus = (item) => {
        if (statusFilter === "all") {
            return true;
        } else {
            return item.status === (statusFilter === "true");
        }
    };

    return (
        <>
            <h3 style={{ textAlign: "center", color: "#4ba891", fontWeight: "bold" }}>My ToDo</h3>
            <nav style={{ background: "white", position: "sticky", top: "0", zIndex: "9000", display: "flex", justifyContent: "space-around", marginTop: "5%" }}>
                <div>
                    <input
                        style={{ width: "100%", maxWidth: "300px", margin: "0 auto" }}
                        placeholder="ToDo Name"
                        value={headInput}
                        onChange={(e) => setHeadInput(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        style={{ width: "100%", maxWidth: "300px", margin: "0 auto" }}
                        placeholder="ToDo Description"
                        value={desInput}
                        onChange={(e) => setDesInput(e.target.value)}
                    />
                </div>
                <button
                    style={{
                        color: "white",
                        background: "#14ad89",
                        fontWeight: "bold",
                        border: "none",
                        width: "100%",
                        maxWidth: "150px",
                        borderRadius: "5px",
                    }}
                    type="button"
                    onClick={() => handleCollect()}
                >
                    Add ToDo
                </button>
            </nav>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "5% 2% 0 2%" }}>
                <h6 style={{ textAlign: "center", color: "#4ba891", fontWeight: "bold" }}>My ToDo</h6>
                <h6 style={{ textAlign: "center", fontWeight: "bold" }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <label>Status Filter : </label>
                        <select
                            style={{ textAlign: "center" }}
                            name="status"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="true">Not Completed</option>
                            <option value="false">Completed</option>
                        </select>
                    </div>
                </h6>
            </div>

            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-center">
                        {card.filter(filterByStatus).map((data, index) => (
                            <div className="col mb-5" key={index}>
                                <div style={{ background: "#ccf5d3" }} className="card h-100">
                                    <div className="card-body p-4">
                                        <div className="text-center">
                                            <h5 className="fw-bolder">{data.time.toLocaleString()}</h5>
                                            <h5 className="fw-bolder">{data.heading}</h5>
                                            <p>{data.description}</p>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <label>Status:</label>
                                                <select
                                                    style={{ textAlign: "center" }}
                                                    name="status"
                                                    value={data.status.toString()}
                                                    onChange={() => handleStatusChange(index)}
                                                >
                                                    <option value="true">Not Completed</option>
                                                    <option value="false">Completed</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent" style={{ display: 'flex', justifyContent: "flex-end" }}>
                                        <div className="text-center mx-1 ">
                                            <button
                                                className="btn btn-warning mt-auto"
                                                type="button"
                                                onClick={() => handleEdit(index)}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                        <div className="text-center">
                                            <button
                                                className="btn btn-danger mt-auto"
                                                type="button"
                                                onClick={() => handleDelete(index)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default ToDoList;